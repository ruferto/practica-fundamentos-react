import React from 'react';
import { login } from '../api/auth';
import { AuthContextConsumer } from './auth/context';
import { useHistory, useLocation } from 'react-router';
import Loading from './Loading';
import ErrorMessage from './ErrorMessage';

const Login = (authValue, ...props) => {
	const { onLogin, isLogged } = authValue;
	const [credentials, setCredentials] = React.useState({
		email: '',
		password: '',
		wantsToBeRemembered: true,
	});

	const [isLoading, setIsLoading] = React.useState(false);

	const history = useHistory();
	const location = useLocation();

	const handleStartLoading = () => {
		setIsLoading(true);
	};
	const handleFinishLoading = () => {
		setIsLoading(false);
	};

	React.useEffect(() => {
		if (isLogged) {
			onLogin();
			const { from } = location.state || { from: { pathname: '/' } };
			history.replace(from);
		}
		return () => {
			setIsLoading(false);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLogged]);

	const { email, password } = credentials;
	const [error, setError] = React.useState(null);
	const resetError = () => {
		setError(null);
	};

	const inputRef = React.useRef(null);
	React.useEffect(() => {
		inputRef.current.focus();
	}, []);

	const handleChange = (event) => {
		switch (event.target.name) {
			case 'wantsToBeRemembered':
				setCredentials((oldValue) => ({
					...oldValue,
					wantsToBeRemembered: event.target.checked,
				}));
				break;

			default:
				setCredentials((oldValue) => ({
					...oldValue,
					[event.target.name]: event.target.value,
				}));
				setError(null);
				break;
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			setError(null);
			handleStartLoading();
			await login(credentials).then(onLogin);
		} catch (error) {
			console.log(error);
			setError(error);
			handleFinishLoading();
		}
	};

	return (
		<div className='login-container'>
			<form className='form-login' onSubmit={handleSubmit}>
				<input
					ref={inputRef}
					className='form-login-email'
					name='email'
					id='email'
					placeholder='email'
					onChange={handleChange}
					disabled={isLoading}
				/>
				<input
					className='form-login-password'
					name='password'
					id='password'
					type='password'
					placeholder='Contraseña'
					onChange={handleChange}
					disabled={isLoading}
				/>
				<button
					className='login-button'
					disabled={isLoading || !email || !password || email.indexOf('@') === -1}
				>
					Login
				</button>
				<div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
					<input
						type='checkbox'
						id='wantsToBeRemembered'
						name='wantsToBeRemembered'
						checked={credentials.wantsToBeRemembered}
						onChange={handleChange}
						disabled={isLoading}
					/>
					&nbsp;
					<label style={{ fontSize: 12 }} htmlFor='wantsToBeRemembered'>
						Remember me
					</label>
				</div>
			</form>
			<Loading isLoading={isLoading} />
			{error ? <ErrorMessage error={error} resetError={resetError} /> : ''}
		</div>
	);
};
const ConnectedLogin = (props) => {
	return (
		<AuthContextConsumer>
			{(value) => {
				return (
					<Login isLogged={value.isLogged} onLogin={value.onLogin} {...props} />
				);
			}}
		</AuthContextConsumer>
	);
};

export default ConnectedLogin;
