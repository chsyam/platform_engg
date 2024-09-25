import LayoutLogin from "../components/ui/Layout/Layout_login";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../styles/Login.module.css";
import { useEffect, useState } from "react";

export default function LoginPage({ username }) {
	const router = useRouter();
	const [message, setMessage] = useState('');
  
	useEffect(() => {
	  if (router.query.message) {
		  setMessage(router.query.message);
		}
  }, [router.query.message]);
	
  return (
    <LayoutLogin pageTitle="Login">
      	<div className={styles.splitScreen}>
        	<div className={styles.rightPane}>
				<div className={styles.tcsLogo}>
					<Image
					alt="logo"
					src="/images/tcs_Logo.png"
					width="300"
					height="300"
					className={styles.footerImage}
					></Image>
					<div className={styles.tag}>Building on Belief</div>
				</div>
	          	<div className={styles.formPane}>
	            	<div className={styles.h3MediumHeading}>
						<div className={styles.h3BoldHeading}>Welcome !</div>
						<div className={styles.subTitle}>Login to get started</div>
					</div>
					<form action="/api/login" method="POST">
						<input
							minLength="3"
							name="username"
							id="username"
							type="text"
							placeholder="Username"
							required
						></input>
						<br />
						<input
							minLength="5"
							name="password"
							id="password"
							type="password"
							placeholder="Password"
							required
						></input>
						{/* <div className={styles.forgot}>
							Forgot Password ?
						</div> */}
						<div className={styles.button}>
							<button className={styles.submitButton} type="submit">Login</button>
						</div>
					</form>
				  	{
					  	message != '' && (
						  	<div style={{ color: "red", textAlign: "center" }}>
							  	*{message}
						  	</div>
		  				)
				  	}
				</div>
			</div>
      	</div>
    </LayoutLogin>
  );
}

export async function getServerSideProps(context) {
  const req = context.req;
  const res = context.res;
  var username = getCookie("username", { req, res });

  if (username != undefined) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  return { props: { username: false } };
}
