import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';
import './style.css';
import logoImg from '../../assets/logo.svg';

export default function Profile(){
    const [casos, setCasos] = useState([]);
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');
    const history = useHistory();

    useEffect( () => {
        api.get('profile', {
            headers: {
                autorizacao: ongId,
            }
        }).then(response => {
            setCasos(response.data)
        })

    }, [ongId]);

    async function handleDeleteCase(id){
        try{
            await api.delete(`casos/${id}`, {
                headers: {
                    autorizacao: ongId,
                }
            });
        setCasos(casos.filter(caso => caso.id !== id))
        } catch(err){
            alert('Erro ao deletar caso, tente novamente.');
        }
    }

    function Logout(){
        localStorage.clear();
        history.push('/');
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero" />
                <span>Bem vinda, {ongName}</span>
                <Link className="button" to="casos/novo">
                Cadastrar um novo caso
                </Link>
                <button onClick={Logout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {casos.map(caso => (
                    <li key={caso.id}>
                    <strong>CASO:</strong>
                    <p>{caso.title}</p>
                    <strong>DESCRIÇÃO:</strong>
                    <p>{caso.desc}</p>
                    <strong>VALOR:</strong>
                    <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(caso.value)}</p>
                    <button onClick={() => handleDeleteCase(caso.id)} type="button">
                        <FiTrash2 size={20} color="#a8a8b3"></FiTrash2>
                    </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}