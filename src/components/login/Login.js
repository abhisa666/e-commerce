import React,{Component} from 'react'
import {withRouter} from 'react-router-dom';
import {auth,firestore} from '../../firebase/firebase';
import './login.css';


// const history = useHistory();

class Login extends Component {



    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.signup = this.signup.bind(this);
        this.state = {
          email: '',
          password: ''
        };
      }

      
      postUser(email){

        const ref = firestore.collection('users').doc(email);
              ref.set(
                { inCart:[] , orders: [] },
                {merge: true}
              );
      }

  

    
      handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
      }
    
      login(e) {
        e.preventDefault();
        auth.signInWithEmailAndPassword(this.state.email, this.state.password)
        .then( () => {
          this.props.history.push('/');
        } )
        .catch((error) => {
            alert(error);
          });
      }
    
      signup(e){
        e.preventDefault();
        auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then( data => data.user.email )
        .then( email => this.postUser(email) )
        .then( () => {
          this.props.history.push('/');
        } )
        .catch((error) => {
            alert(error);
            console.log(error);
          })
      }



    render(){
    return (
        <div className="container">
           <div className="row login-row">
            <div className="login-pic col-xl-6 col-md-6 col-lg-6 col-sm-12 col-12"></div>
            <div className="login-form col-xl-6 col-md-6 col-lg-6 col-sm-12 col-12 ">
                <form className="form">
                <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input value={this.state.email} onChange={this.handleChange} type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input value={this.state.password} onChange={this.handleChange} type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                </div>
                <div className="btn-container">
                <button type="submit" onClick={this.login} className="btn btn-primary">Login</button>
                <button onClick={this.signup} className="btn btn-success">Signup</button>
             </div>
             </form>

            </div>
            </div>
        </div>
    )

    }
}

export default withRouter(Login);