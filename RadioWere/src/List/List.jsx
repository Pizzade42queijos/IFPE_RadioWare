import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Songlist() {
  const [row1, setRow1] = useState('');
  const [row2, setRow2] = useState('');
  const [jsonObjectList, setJsonObjectList] = useState({}); // Estado alterado para um objeto
  const [selectedRows, setSelectedRows] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoginVisible, setIsLoginVisible] = useState(true);
  const [listName, setListName] = useState('');
  const audioRef = useRef(null);

  const handleAdd = () => {
    if (row1.trim() && row2.trim()) {
      setJsonObjectList(prevState => {
        const updatedState = { ...prevState };

        if (!updatedState[listName]) {
          // Se a chave do listName não existir, cria um novo array para a playlist
          updatedState[listName] = [];
        }

        // Adiciona a nova música à lista correspondente ao listName
        updatedState[listName].push({ row1, row2 });
        return updatedState;
      });

      setRow1('');
      setRow2('');
    } else {
      alert('Preencha todos os campos necessários');
    }
  };

  const handleRemove = (indexToRemove) => {
    setJsonObjectList(prevState => {
      const updatedState = { ...prevState };

      // Filtra a lista de músicas associada ao listName para remover o item
      updatedState[listName] = updatedState[listName].filter((_, index) => index !== indexToRemove);
      return updatedState;
    });
  };

  const handleDeleteSelected = () => {
    setJsonObjectList(prevState => {
      const updatedState = { ...prevState };
      
      // Filtra as músicas da lista atual para remover as selecionadas
      updatedState[listName] = updatedState[listName].filter((_, index) => !selectedRows.includes(index));

      return updatedState;
    });

    setSelectedRows([]); // Reseta as seleções
  };

  const handleCheckboxChange = (index) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(index)
        ? prevSelectedRows.filter((i) => i !== index) // Desmarcar
        : [...prevSelectedRows, index] // Marcar
    );
  };

  const handlePlayPause = (url) => {
    if (audioRef.current) {
      if (isPlaying && audioRef.current.src === url) {
        // Para o áudio
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // Toca
        audioRef.current.src = url;
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleLoginSubmit = () => {
    if (listName.trim()) {
      // Dá nome à lista
      document.title = listName; // Muda nome da página

      // Mostrar a página principal
      setIsLoginVisible(false);
    } else {
      alert('Por favor digite algo');
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
            <button className="btn btn-primary" onClick={handleAdd}>Adicionar à {listName}</button>
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
