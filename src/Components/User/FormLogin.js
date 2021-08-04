import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import Header from "Components/Layout/Header";
import Footer from "Components/Layout/Footer";

const api = axios.create({
	headers: {
		"Access-Control-Allow-Origin": "*",
	},
});

const FormLogin = () => {
	const [userId, setUserId] = useState();
	const [userPasswd, setUserPasswd] = useState();
	const [status, setStatus] = useState(null);
	const history = useHistory();
	const [data, setData] = useState();
	const [cookies, setCookie, removeCookie] = useCookies();
	const [loginType, setloginType] = useState("teacher");

	// 처음 시작 시 cookies 지우기
	useEffect(() => {
		removeCookie("t_email");
		removeCookie("t_name");
		removeCookie("s_email");
		removeCookie("s_name");
		removeCookie("isLogin");
	}, []);

	const handleOptionChange = (e) => {
		e.target.value ? setloginType(e.target.value) : setloginType("");
		console.log(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		let data;

		if (loginType === "teacher") {
			data = {
				t_email: userId,
				t_password: userPasswd,
			};
			setData(data);
		} else if (loginType === "student") {
			data = {
				s_email: userId,
				s_password: userPasswd,
			};
			setData(data);
		} else {
			alert("先生と学生を選択してください。");
		}

		console.log(data);

		axios
			.post("login", data)
			.then((res) => {
				localStorage.setItem("token", res.data.token);
				console.log(res.data.login);

				const { accessToken } = res.data;
				axios.defaults.headers.common[
					"Authorization"
				] = `Bearer ${accessToken}`;
				console.log(accessToken);

				if (res.data.login === "success" && res.data.token) {
					console.log(res.data);
					alert("ログインされました。");
					setStatus(res.status);

					if (loginType === "teacher") {
						setCookie("t_email", data.t_email);
						setCookie("t_name", res.data.t_name);
						history.push("/teacher");
					} else if (loginType === "student") {
						setCookie("s_email", data.s_email);
						setCookie("s_name", res.data.s_name);
						history.push("/student");
					}

					setCookie("isLogin", true);
				} else {
					alert(
						"ログインに失敗しました。\nIDとパスワードを確認してください。"
					);
					history.push("/login");
				}
			})
			.catch((err) => {
				err.response &&
					err.response.data &&
					console.log(err.response.data);
				localStorage.removeItem("token");
				setStatus(err.status);
			});
	};

	return (
		<>
			<Header />
			<div id='wrapper' className='bg'>
				<div id='container'>
					<div className='top_txt'>
						<p className='tit'>
							オンライン試験監督サービス Re:Coder
						</p>
						<p>
							不正行為の心配なく
							<br />
							オンライン試験を運営、監督できます。
						</p>
					</div>
					<div className='login_input_wrap'>
						<div className='wlogo'>
							<img
								src='./img/login_join_logo.gif'
								alt='로그인, 회원가입 페이지 로고'
							/>
						</div>
						<p className='txt'>ホームページへようこそ。</p>
						<form action='' onSubmit={handleSubmit}>
							{/**/}
							<div className='login_radio_area'>
								<div className='toggle-button toggle-button--maa'>
									<input
										id='login_teacher'
										name='login_type'
										type='radio'
										value='teacher'
										defaultChecked={true}
										onChange={handleOptionChange}
									/>
									<label
										for='login_teacher'
										data-text='先生'
									></label>
									<div className='toggle-button__icon'></div>
								</div>
								<div className='toggle-button toggle-button--maa'>
									<input
										id='login_student'
										name='login_type'
										type='radio'
										value='student'
										onChange={handleOptionChange}
									/>
									<label
										for='login_student'
										data-text='学生'
									></label>
									<div className='toggle-button__icon'></div>
								</div>
							</div>

							<input
								type='text'
								name='userId'
								onChange={(e) => {
									setUserId(e.target.value);
								}}
								placeholder='IDを入力してください。'
							/>
							<input
								type='password'
								name='userPasswd'
								onChange={(e) => {
									setUserPasswd(e.target.value);
								}}
								placeholder='Passwordを入力してください。'
							/>
							<input type='submit' value='Login' />
						</form>

						<p className='login_link mt30'>
							まだ加入していませんか。{" "}
							<Link to='/signup'>Join</Link>
						</p>
						<p className='login_link'>
							ID/パスワードを覚えていませんか？
							<Link to=''>Find ID/Password</Link>
						</p>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default FormLogin;
