import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api'
import './style.css';
import logoImg from '../../assets/logo.svg';

export default function NovoCaso(){
    const [ title, setTitle] = useState('');
    const [ desc, setDesc] = useState('');
    const [ value, setValue] = useState('');
    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

   async function novoCaso(e){
        e.preventDefault();
        const data = {
            title,
            desc,
            value,
        };

        try {
            await api.post('casos', data, {
                headers: {
                    autorizacao: ongId,
                }
            })
            history.push('/profile');
        } catch(err){
            alert('Erro ao cadastrar caso, tente novamente.');
        }
    }

    return (
        <div className="novo-caso-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be the Hero" />
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color='#E02141' />
                        Voltar para home
                    </Link>

                </section>
                <form onSubmit={novoCaso}>
                    <input 
                        placeholder="Título do caso" 
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        />
                    <textarea 
                        placeholder="Descrição"
                        value={desc}
                        onChange={e => setDesc(e.target.value)}
                        />
                    <input 
                        placeholder="Valor em reais" 
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        />
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}