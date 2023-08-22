import styles from "./header.module.css";


function Header({user}){
    console.log(user)
    return (
        <div className={styles.mainContainer}>
            
            <header>
                <h2> Bem-Vindo, Raul </h2>
            </header>
            <main>
                <div className={styles.info}>
                    <div>
                        <h3>Perfil </h3>
                        <p>Essas são as informações do seu Perfil</p>
                    </div>
                </div>
                <div className={styles.info}><span>Foto</span><span><img src={user.photo}></img></span></div>
                <div className={styles.info}><span>Nome</span><span>{user.name}</span></div>
                <div className={styles.info}><span>Bio</span><span>{user.bio}</span></div>
                <div className={styles.info}><span>Telefone</span> <span>{user.phone}</span></div>
                <div className={styles.info}><span>Email</span><span>{user.email}</span></div>
                
            </main>
        </div>
    )
}

export default Header