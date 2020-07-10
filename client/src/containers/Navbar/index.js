import React from 'react';
import { Button } from '../../components/Button';
import { Link, useLocation } from 'react-router-dom';
import { user as userAPI } from '../../utils/API';
import style from "./style.module.css";

const Navbar = props => {
	const signout = () => {
		userAPI
			.signout()
			.then(() => props.setUser({}))
			.catch(e => {
				throw e;
			});
	};

	// get location from react router location hook
	let location = useLocation();

	console.group('navbar');
	console.info(`🌎 page rendered at path: '${location.pathname}'`, '\n');
	console.info('🤖 user', props.user);
	console.groupEnd();

	return (
		<div
			style={{ padding: 4, color: 'white', lineHeight: '20px' }}
			className='bg-success'
		>
			<Link to='/'>
				<div className={`${style.logo} btn`} >
					Navbar
				</div>
			</Link>
			{ props.user.id 
				?  <Button theme='dark' onClick={signout}><i className='fa fa-sign-out fa-1x' aria-hidden='true'></i></Button>
				:  location.pathname === '/signup' 
					? 	<Link to='/login'><Button>login</Button></Link>
					:  <Link to='/signup'><Button theme='primary'>Signup</Button></Link>
			}
		</div>
	);
};
export default Navbar;
