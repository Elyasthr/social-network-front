import React, {useState}  from 'react';
import axios from 'axios';
import SignInForm from './SignInForm';

const SignUpForm = () => {
    const [formSubmit, setFormSubmit] = useState(false);
    const [pseudo, setPseudo] = useState("");
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [age, setAge] = useState("");
    const [genre, setGenre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [controlPassword, setControlPassword] = useState("");

    const gestInscription = async (e)=>{
        e.preventDefault();//empeche de recharger la page

        const pseudoError = document.querySelector('.pseudo.invalid-feedback');
        const nomError = document.querySelector('.nom.invalid-feedback');
        const prenomError = document.querySelector('.prenom.invalid-feedback');
        const ageError = document.querySelector('.age.invalid-feedback');
        const genreError = document.querySelector('.genre.invalid-feedback');
        const emailError = document.querySelector('.email.invalid-feedback');
        const passwordError = document.querySelector('.password.invalid-feedback');
        const passwordConfirmError = document.querySelector('.password-confirm.invalid-feedback');

        if(password !== controlPassword){
            passwordConfirmError.innerHTML = "Les mots de passe ne sont pas les même";
        }
        else{
            axios({
                method: 'post',
                url: `${process.env.REACT_APP_API_URL}api/user/register`,
                withCredentials: true,
                data:{
                    pseudo,
                    email,
                    password,
                    nom,
                    prenom,
                    age,
                    genre,
                    
                } 
              }).then((res)=>{
                if(res.data.errors){
                    pseudoError.innerHTML = res.data.errors.pseudo;
                    emailError.innerHTML = res.data.errors.email;
                    passwordError.innerHTML = res.data.errors.password;
                    nomError.innerHTML = res.data.errors.nom;
                    prenomError.innerHTML = res.data.errors.prenom;
                    ageError.innerHTML = res.data.errors.age;
                    genreError.innerHTML = res.data.errors.genre;
                  
                }
                else{
                    setFormSubmit(true);
                }
              }).catch((err)=>{
                 console.log(err);
              })
        }

    }

  return (
    <>
    {formSubmit ? (
        <>
        <div className="alert alert-success" role="alert">
            Inscription reussi, vous pouvez vous connecter !
        </div>
        <SignInForm />
        </>
    ) :(
            <form action='' onSubmit={gestInscription} id='signin-form'>
                <div className="form-group">
                    <label htmlFor='pseudo' >Pseudo</label>
                    <input type='text' name='pseudo' className="form-control" onChange={(e)=> setPseudo(e.target.value)} value={pseudo}/>
                    <div className="pseudo invalid-feedback"></div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor='nom' >Nom</label>
                        <input type='text' name='nom' className="form-control" onChange={(e)=> setNom(e.target.value)} value={nom}/>
                        <div className="nom invalid-feedback"></div>
                    </div>

                    <div className="form-group col-md-6">
                        <label htmlFor='prenom' >Prenom</label>
                        <input type='text' name='prenom' className="form-control" onChange={(e)=> setPrenom(e.target.value)} value={prenom}/>
                        <div className="prenom invalid-feedback"></div>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor='age'>Age</label>
                        <input type='text' name='age' className="form-control" onChange={(e)=> setAge(e.target.value)} value={age}/>
                        <div className="age invalid-feedback"></div>
                    </div>

                    <div className="form-group col-md-6">
                        <label htmlFor='genre'>Genre</label>
                        <select name='genre' className="form-control" onChange={(e)=> setGenre(e.target.value)} value={genre}>
                            <option value="Homme" defaultValue>Homme</option>
                            <option value="Femme">Femme</option>
                        </select>
                        <div className="genre invalid-feedback"></div>
                    </div>
                </div>
                
                <div className="form-group">
                    <label htmlFor='email' >Email</label>
                    <input type='text' name='email' className="form-control" onChange={(e)=> setEmail(e.target.value)} value={email}/>
                    <div className="email invalid-feedback"></div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor='password'>Mot de passe</label>
                        <input type='password' name='password' className="form-control" onChange={(e)=> setPassword(e.target.value)} value={password}/>
                        <div className="password invalid-feedback"></div>
                    </div>

                    <div className="form-group col-md-6">
                        <label htmlFor='password-confirm'>Confirmer mot de passe</label>
                        <input type='password' name='password-confirm' className="form-control" onChange={(e)=> setControlPassword(e.target.value)} value={controlPassword}/>
                        <div className="password-confirm invalid-feedback"></div>
                    </div>
                </div>

                <div className="form-group">
                    <button type='submit' className="btn btn-dark col">Inscription</button>
                </div>
            </form>
        )}
    </>
  
)}

export default SignUpForm;