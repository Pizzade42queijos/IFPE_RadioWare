import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Songlist() {
  const [row1, setRow1] = useState('');
  const [row2, setRow2] = useState('');
  const [jsonObjectList, setJsonObjectList] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoginVisible, setIsLoginVisible] = useState(true); // State para visibilidade da área de login
  const [listName, setListName] = useState(''); // State para armazenar o nome da lista
  const audioRef = useRef(null);

  // !!!!!!! Substituímos o Axios por fetch para realizar as requisições HTTP ao backend.

  const checkPlaylistExists = async (name) => {
    // !!!!!!! Esta função verifica se uma playlist já existe no banco de dados usando uma requisição GET com fetch. Retorna os dados se existir ou null caso contrário.
    try {
      const response = await fetch(`/api/playlists/${name}`);
      if (!response.ok) {
        throw new Error('Playlist não encontrada');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao verificar a playlist:', error);
      return null;
    }
  };

  const createPlaylist = async (name, data) => {
    // !!!!!!! cria uma nova playlist no banco de dados com o nome e dados fornecidos, enviando um POST 
    try {
      const response = await fetch('/api/playlists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, data }),
      });
      if (!response.ok) {
        throw new Error('Erro ao criar playlist');
      }
    } catch (error) {
      console.error('Erro ao criar playlist:', error);
    }
  };

  const updatePlaylist = async (name, data) => {
    // !!!!!!! tualiza uma playlist existente no banco de dados usando uma requisição PUT 
    try {
      const response = await fetch(`/api/playlists/${name}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
      });
      if (!response.ok) {
        throw new Error('Erro ao atualizar playlist');
      }
    } catch (error) {
      console.error('Erro ao atualizar playlist:', error);
    }
  };

  const handleLoginSubmit = async () => {
    // !!!!!!! verifica se a playlist fornecida no login já existe no banco. Se já existir, carrega os dados; caso contrário, cria uma nova playlist no banco de dados.
    if (listName.trim()) {
      try {
        const existingPlaylist = await checkPlaylistExists(listName);
        if (existingPlaylist) {
          setJsonObjectList(existingPlaylist.data);
        } else {
          await createPlaylist(listName, []);
          setJsonObjectList([]);
        }
        setIsLoginVisible(false);
      } catch (error) {
        alert('Erro ao processar a playlist');
      }
    } else {
      alert('Por favor digite algo');
    }
  };

  const [isLoading, setIsLoading] = useState(false); // Estado para controle do uso do botão

  const handleAdd = async () => {
    if (row1.trim() && row2.trim()) {
      setIsLoading(true); // Ativa o estado de carregamento
      const newList = [...jsonObjectList, { row1, row2 }];
      setJsonObjectList(newList);
      try {
        await updatePlaylist(listName, newList);
      } catch (error) {
        alert('Erro ao adicionar música. Tente novamente.');
      } finally {
        setIsLoading(false); // Desativa o estado de carregamento
      }
      setRow1('');
      setRow2('');
    } else {
      alert('Preencha todos os campos necessários');
    }
  };
  

/*   const handleRemove = async (indexToRemove) => {
    // !!!!!!! remove uma música específica da playlist e reflete essa alteração no banco de dados enviando a lista atualizada.
    const updatedList = jsonObjectList.filter((_, index) => index !== indexToRemove);
    setJsonObjectList(updatedList);
    await updatePlaylist(listName, updatedList);
  }; */

  const handleDeleteSelected = async () => {
    // !!!!!!! exclui todas as músicas selecionadas da playlist e atualiza os dados no banco de dados com a nova lista.
    const updatedList = jsonObjectList.filter((_, index) => !selectedRows.includes(index));
    setJsonObjectList(updatedList);
    setSelectedRows([]);
    await updatePlaylist(listName, updatedList);
  };

  const handleCheckboxChange = (index) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(index)
        ? prevSelectedRows.filter((i) => i !== index) // De-selecionar
        : [...prevSelectedRows, index] // Selecionar
    );
  };

  const handlePlayPause = (url) => { ///Pausa e despausa musica
    if (audioRef.current) {
      if (isPlaying && audioRef.current.src === url) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.src = url;
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="container mt-5">
      {isLoginVisible && (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <div className="card p-4" style={{ width: '300px' }}>
            <h3 className="mb-4 text-center">RadioWare</h3>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="O nome da sua playlist incrível"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
            />
            <button className="btn btn-primary w-100" onClick={handleLoginSubmit}>
              Criar ou Entrar
            </button>
          </div>
        </div>
      )}

      {!isLoginVisible && (
        <>
          <h1 className="mb-2">Playlist RadioWare</h1>
          <p className="fst-italic">Bem-vindo a {listName}! Adicione ou exclua músicas abaixo, use o play para tocar</p>

          <div className="d-flex align-items-center mb-3">
            <input
              type="text"
              className="form-control me-2"
              placeholder="O nome da sua música"
              value={row1}
              onChange={(e) => setRow1(e.target.value)}
            />
            <input
              type="text"
              className="form-control me-2"
              placeholder="Seu link .mp3"
              value={row2}
              onChange={(e) => setRow2(e.target.value)}
            />
            <button 
            className="btn btn-primary" 
            onClick={handleAdd} 
            disabled={isLoading}>
            {isLoading ? 'Adicionando...' : `Adicionar à ${listName}`}
            </button>
          </div>

          <hr />

          <h3>{listName}</h3>
          <div className="table-responsive" style={{ maxHeight: '200px', overflowY: 'scroll' }}>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th style={{ width: '5%' }}>Select</th>
                  <th style={{ width: '30%' }}>Nome</th>
                  <th style={{ width: '50%' }}>URL</th>
                  <th style={{ width: '15%' }}>Play</th>
                </tr>
              </thead>
              <tbody>
                {jsonObjectList[listName]?.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(index)}
                        onChange={() => handleCheckboxChange(index)}
                      />
                    </td>
                    <td>{item.row1}</td>
                    <td>{item.row2}</td>
                    <td style={{ verticalAlign: 'middle' }}>
                      <button
                        className="btn btn-success btn-sm"
                        style={{ height: '40px', fontSize: '18px' }}
                        onClick={() => handlePlayPause(item.row2)}
                      >
                        {isPlaying && audioRef.current?.src === item.row2 ? (
                          <i className="bi bi-pause-fill"></i>
                        ) : (
                          <i className="bi bi-play-fill"></i>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Botão de excluir */}
          <button
            className="btn btn-danger mt-3"
            onClick={handleDeleteSelected}
            disabled={selectedRows.length === 0}
          >
            Delete Selected
          </button>

          {/* Audio Player Oculto */}
          <audio
            ref={audioRef}
            style={{ display: 'none' }} // Esconde
          ></audio>
        </>
      )}
    </div>
  );
}

export default Songlist;
