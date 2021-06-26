import React, { useState }  from 'react'
import { NavLink , useHistory  } from 'react-router-dom'
import swal from 'sweetalert';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const SignUp =()=>{
  const history = useHistory();
  const [user , setUser] = useState({
  name :"" , email:"", phone:"", work:"", password:"", confirmPassword:"" 
  })

  let name , value;
  const handleInputs = (e)=>{
    console.log(e)
    name= e.target.name;
    value = e.target.value;

    setUser({...user , [name]:value})
  }
  const validationSchema = Yup.object().shape({

    name: Yup.string()
        .required('Name is required'),
    email: Yup.string()
        .required('Email is required')
        .email('Email is invalid')
        .matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
        
    phone: Yup.string()
        .required('Phone number is required')
        .min(10, 'Phone number must be 10 Digit')
        .max(10, 'Phone number must be 10 Digit'),
        
    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});
const formOptions = { resolver: yupResolver(validationSchema) };

const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;
    const isEnabled = user.name.length > 0 && user.email.length > 0 && user.phone.length > 0 && user.password.length > 0 && user.confirmPassword.length;
  const PostData = async ()=>{


    const {name , email , phone , work , password , confirmPassword} = user;

    const res = await fetch("https://backend-node-app.herokuapp.com/register", {
      method:"POST",
      headers:{"Content-Type" : "application/json"},
      body:JSON.stringify({
        name:name , email:email , phone:phone , work:work , password:password, confirmPassword:confirmPassword
      })
    })
    const data = await res.json();
    

    if (res.status === 422 || !data  ){
        swal({
            title: "Error!",
            text: "user not Found",
            icon: "warning",
            timer: 2000,
            button: false
          })
      //window.alert("Invalid Registration")
      console.log("Invalid Registration")
    }
    else{
        swal({
            title: "Done!",
            text: "User Login Succesfully",
            icon: "success",
            timer: 2000,
            button: false
          })
     // window.alert("Registration Successfully")
      console.log("Registration Successfully")

      history.push("/login");
    }
  }

    return(
      //   <>

      //   <div className="signup" >
      //       <div className="container">
      //           <div className="sign-content">
                    
      //                   <form className="signup-form" id="register-form">
      //                   <h2 className="form-title">SignUp</h2>
      //                       <div className="form-group">
      //                           <label htmlFor="name">
      //                           <i className="zmdi zmdi-account material-icons-name p-2"></i>
      //                           </label>
      //                           <input type="text" name="name" value={user.name} onChange={handleInputs} id="name" autoComplete="off" placeholder="Your Name"></input>
      //                       </div>

      //                       <div className="form-group">
      //                           <label htmlFor="email">
      //                           <i className="zmdi zmdi-email material-icons-name p-2"></i>
      //                           </label>
      //                           <input type="text" name="email" value={user.email} onChange={handleInputs} id="email" autoComplete="off" placeholder="Your Email"></input>
      //                       </div>

      //                       <div className="form-group">
      //                           <label htmlFor="phone">
      //                           <i className="zmdi zmdi-phone-in-talk material-icons-name p-2"></i>
      //                           </label>
      //                           <input type="text" name="phone"  value={user.phone} onChange={handleInputs} id="phone" autoComplete="off" placeholder="Your Phone"></input>
      //                       </div>

      //                       <div className="form-group">
      //                           <label htmlFor="work">
      //                           <i className="zmdi zmdi-slideshow material-icons-name p-2"></i>
      //                           </label>
      //                           <input type="text" name="work" value={user.work} onChange={handleInputs} id="work" autoComplete="off" placeholder="Your work"></input>
      //                       </div>

      //                       <div className="form-group">
      //                           <label htmlFor="password">
      //                           <i className="zmdi zmdi-lock material-icons-name p-2"></i>
      //                           </label>
      //                           <input type="password" name="password" value={user.password} onChange={handleInputs} id="password" autoComplete="off" placeholder="Your password"></input>
      //                       </div>

      //                       <div className="form-group">
      //                           <label htmlFor="confirmPassword">
      //                           <i className="zmdi zmdi-lock material-icons-name p-2"></i>
      //                           </label>
      //                           <input type="password" name="confirmPassword" value={user.confirmPassword} onChange={handleInputs} id="confirmPassword" autoComplete="off" placeholder="Your Confirm password"></input>
      //                       </div>

      //                       <div className="form-group form-button">
      //                           <input type="submit"  id ="signup" onClick={PostData} className="form-submit" value="Register"></input>
      //                       </div>

      //                       <div className="form-group">
      //                           <NavLink to="/login" >I am already Register</NavLink>
      //                       </div>
      //                   </form>

      //               </div>
                    
      //           </div>

      //       </div>
      // </>
      <section className="signup-block">
  <div className="container">
	<div className="row">
		<div className="col-md-4 signup-sec">
		    <h2 className ="text-center mt-0">Signup Now</h2>
	<form className="login-form" onSubmit={handleSubmit(PostData)}>
        <div className="form-group">
            <label for="exampleInputEmail1" class="text-uppercase mt-1">Username</label>
            <input type="text"  name="name" {...register('name')} className={`form-control ${errors.name ? 'is-invalid' : ''}`} value={user.name} onChange={handleInputs} id="name" placeholder="Enter Name"/>
            <span>{errors.name?.message}</span>
        </div>
        <div className="form-group">
            <label for="exampleInputPassword1" class="text-uppercase">Email</label>
            <input type="text" name="email" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} value={user.email} onChange={handleInputs} id="email"   placeholder="Enter your Email"/>
            <span>{errors.email?.message}</span>
        </div>
        <div className="form-group">
            <label for="exampleInputEmail1" class="text-uppercase">Phone</label>
            <input type="number" name="phone" {...register('phone')} className={`form-control ${errors.phone ? 'is-invalid' : ''}`}  value={user.phone} onChange={handleInputs} id="phone"  placeholder="phone"/>
            <span>{errors.phone?.message}</span>
        </div>
        <div className="form-group">
            <label for="exampleInputEmail1" class="text-uppercase">Work</label>
            <input type="text" name="work" {...register('work')} className={`form-control ${errors.work ? 'is-invalid' : ''}`} value={user.work} onChange={handleInputs} id="work"  placeholder="your work.."/>
            <span>{errors.work?.message}</span>
        </div>
        <div className="form-group">
            <label for="exampleInputPassword1" class="text-uppercase">Password</label>
            <input type="password" name="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} value={user.password} onChange={handleInputs} id="password"  placeholder="Entere Password"/>
            <span>{errors.password?.message}</span>
        </div>
        <div className="form-group">
            <label for="exampleInputPassword1" class="text-uppercase">Confirn Password</label>
            <input type="password" name="confirmPassword" {...register('confirmPassword')} className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} value={user.confirmPassword} onChange={handleInputs} id="confirmPassword"  placeholder="Confirn Password"/>
            <span>{errors.confirmPassword?.message}</span>
        </div>
  
  
        <div className="col-9 justify-content-center">
            <button type="submit"  id ="signup" disabled={!isEnabled} value="Register" class="btn btn-login float-right border-dark font-weight-bold px-5">Submit</button>
        </div>
  
    </form>
    <div className="copy-text">Created with <i class="fa fa-heart"></i> by Zaid Baba</div>
	</div>
		<div className="col-md-8 banner-sec">
            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                 <ol className="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                  </ol>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
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



export default SignUp