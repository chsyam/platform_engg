import styles from './index.module.css'; 

export default function Button({ id, label, onClick, disabled, type }){

    return (
      <button
        id={id}
        className={styles.button}
        onClick={onClick}
        disabled={disabled}
        type={type}
      >
        <label>{label}</label>
      </button>
    );
}
