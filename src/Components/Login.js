import React,{ useState }  from 'react'
import { NavLink , useHistory } from 'react-router-dom'
import swal from 'sweetalert';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const Login = ()=>{
    const history = useHistory()
    const [user , setUser] = useState({
         email:"", password:"",
        })
      
        let name , value;
        const handleInputs = (e)=>{
          console.log(e)
          name= e.target.name;
          value = e.target.value;
      
          setUser({...user , [name]:value})

        }

        const validationSchema = Yup.object().shape({

            email: Yup.string()
                .required('Email is required')
                .email('Email is invalid')
                .matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
            password: Yup.string()
                .required('Password is required')
        });
        const formOptions = { resolver: yupResolver(validationSchema) };
        
        const { register, handleSubmit, formState } = useForm(formOptions);
            const { errors } = formState;
     const login = async ()=>{
        const {email , password } = user;
        const res = await fetch("http://localhost:4000/login", {
          method:"POST",
          headers:{"Content-Type" : "application/json"},
          body:JSON.stringify({
            email:email , password:password,
          })
        })
        console.log(res.status)
        const data = await res.json();
        console.log(data)
    
        
        if(res.status === 400 || !data  ){
            swal({
                title: "Error!",
                text: "Enter Email and Password",
                icon: "warning",
                timer: 2000,
                button: false
              })
          console.log("Enter Email and Password")
          return  history.push("/login");
        }
        if (res.status === 420 || !data  ){
            swal({
                title: "Error!",
                text: "Invalid Email Or Password",
                icon: "warning",
                timer: 2000,
                button: false
              })
          console.log("Invalid Email Or Password")
          return  history.push("/login");
        }
        
        else{
            swal({
                title: "Done!",
                text: "User Login Succesfully",
                icon: "success",
                timer: 2000,
                button: false
              })
          console.log("Login Successfully")
		 return  history.push("/home");

        }
        }
        const isEnabled = user.email.length > 0 && user.password.length > 0;
    return( 
        // <div className="login" >
        //     <div className="container mt-5">
        //         <div className="login-content">
        //             <div className="login-form">
                        
        //                 <form className="login-form" id="login-form">
        //                 <h2 className="form-title">Login</h2>
        //                     <div className="form-group">
        //                         <label htmlFor="email">
        //                         <i className="zmdi zmdi-email material-icons-name p-2"></i>
        //                         </label>
        //                         <input type="text" name="email" value={user.email} onChange={handleInputs} id="email" autoComplete="off" placeholder="Your Email" required></input>
        //                     </div>

        //                     <div className="form-group">
        //                         <label htmlFor="password">
        //                         <i className="zmdi zmdi-lock material-icons-name p-2"></i>
        //                         </label>
        //                         <input type="password" name="password" value={user.password} onChange={handleInputs}s id="password" autoComplete="off" placeholder="Your password" required></input>
        //                     </div>


        //                     <div className="form-group form-button">
        //                         <input type="submit" name="login" onClick={login} id ="login" className="form-submit" value="Login"></input>
        //                     </div>

        //                     <div className="form-group">
        //                         <NavLink to="/signup" >I Don't have Account</NavLink>
        //                     </div>
        //                 </form>

        //             </div>
                    
        //         </div>

        //     </div>
        // </div>
        
<section className="login-block">
  <div className="container">
	<div className="row">
		<div className="col-md-4 login-sec">
		    <h2 className ="text-center">Login Now</h2>
	<form className="login-form needs-validation" onSubmit={handleSubmit(login)} novalidate>
        <div className="form-group">
            <label for="exampleInputEmail1" for="validationCustom01" class="text-uppercase">Email</label>
            <input type="text" name="email" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} value={user.email} onChange={handleInputs} id="email"  placeholder="Enter your Email"/>
            <span>{errors.email?.message}</span>
        </div>
        <div className="form-group">
            <label for="exampleInputPassword1" class="text-uppercase">Password</label>
            <input type="password" name="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} value={user.password} onChange={handleInputs}s id="password" placeholder="password"/>
            <span>{errors.password?.message}</span>
        </div>
  
  
        <div className="col-7 ">
            <button type="submit" name="login" id ="login" disabled={!isEnabled} class="btn btn-login float-right border-dark font-weight-bold px-2">Submit</button>
             <NavLink to="/signup">I Don't have Account</NavLink>    
        
        </div>
        
    </form>
    <div className="copy-text">Created with <i class="fa fa-heart"></i> by Zaid Baba</div>
	</div>
		<div className="col-md-8 banner-sec">
            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                 <ol className="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                  </ol>
            <div className="carousel-inner" role="listbox">
                <div className="carousel-item active">
                    <img className="d-block img-fluid" src="https://static.pexels.com/photos/33972/pexels-photo.jpg" alt="First slide"/>
                    <div className="carousel-caption d-none d-md-block">
                    <div className="banner-text">
                        <h2>This is Heaven</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
                    </div>	
                    </div>
                </div>
                <div className="carousel-item">
                    <img className="d-block img-fluid" src="https://images.pexels.com/photos/7097/people-coffee-tea-meeting.jpg" alt="First slide"/>
                    <div className="carousel-caption d-none d-md-block">
                    <div className="banner-text">
                        <h2>This is Heaven</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
                    </div>	
                    </div>
                </div>
                <div className="carousel-item">
                <img className="d-block img-fluid" src="https://static.pexels.com/photos/33972/pexels-photo.jpg" alt="First slide"/>
                <div className="carousel-caption d-none d-md-block">
                    <div className="banner-text">
                        <h2>This is Heaven</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
                    </div>	
                </div>
                </div>
            </div>	   
		    
		</div>
	</div>
</div>
</div>
</section>

    )
}


export default Login
