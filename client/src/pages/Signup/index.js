import React, { Component } from 'react';
import styles from './style.module.css';
import Card from '../../components/Card';
import { Redirect } from 'react-router-dom';
import { Input, FormBtn } from '../../components/Form';
import { Col, Row, Container } from '../../components/Grid';
import { user as userAPI } from '../../utils/API';
import validateUser from "../../utils/validateUser";

class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			username: '',
			password: '',
			passwordConf: ''
		};
	}

	handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		});
	};

	handleFormSubmit = event => {
		event.preventDefault();
		this.props.setLoading(true);
    
    // validate all fields
    if (!this.state.email || !this.state.password || !this.state.passwordConf) {
		  this.props.setLoading(false);
      // set error alert to user
      return this.props.setAlertInfo({theme:"warning", message:"Please fill all required fields"})
    }

    // validate pass === to passConfirmation.
    if(this.state.password.trim() !== this.state.passwordConf.trim()) {
		  this.props.setLoading(false);
      // set error alert to user
      return this.props.setAlertInfo({theme:"warning", message:"Your password fields do not match."})
    }

    // if good to go
		userAPI
				.signup({
					username: this.state.username.trim(),
					email: this.state.email.trim(),
					password: this.state.password.trim(),
					passwordConf: this.state.passwordConf.trim()
				})
				.then(res => {
					if (res.status === 200) {
						this.props.setLoading(false);
						this.props.setUser(res.data);
						return <Redirect to='/home' />;
					} else {
						console.log(res.response)
						this.props.setLoading(false);
						this.props.setAlertInfo({
							theme: 'warning',
							message: res.response.data.message
						});
					}
				})
				.catch(res => {
					this.props.setLoading(false);
					this.props.setAlertInfo({ theme: 'warning', message: res.response.data });
				});
	};

	render() {
		return (
			<Container fluid>
				<Row>
					<Col size='12'>
						<Card title='Signup'>
							<form className={styles.form} onSubmit={this.handleFormSubmit}>
								<Input
									value={this.state.username}
									onChange={this.handleInputChange}
									name='username'
									placeholder='username (required)'
								/>
								<Input
									value={this.state.email}
									onChange={this.handleInputChange}
									name='email'
									placeholder='email (required)'
								/>
								<Input
									value={this.state.password}
									onChange={this.handleInputChange}
									name='password'
									placeholder='(required)'
									type='password'
								/>
								<Input
									value={this.state.passwordConf}
									onChange={this.handleInputChange}
									name='passwordConf'
									placeholder='(required)'
									type='password'
								/>

								<FormBtn
									disabled={!(this.state.email && this.state.password && this.state.passwordConf)}
									theme='primary'
								>
									signup
								</FormBtn>
							</form>
						</Card>
					</Col>
				</Row>
				{/* redirect on authenticated */}
        { validateUser(this.props.user)
          ?  <Redirect to='/home' /> 
          :  <></> }
			</Container>
		);
	}
}

export default Signup;
