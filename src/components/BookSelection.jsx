import styles from "../styles/BookSelection.module.css";

const books = [
  {
    id: 1,
    title: "Vildheks",
    description: "Besøg den magiske verden med Clara",
  },
  {
    id: 2,
    title: "Sofies Verden",
    description: "Udforsk filosofiens spændende univers",
  },
];

export default function BookSelection({ selected, onSelect }) {
  return (
    <div className={styles.list}>
      {books.map((book) => (
        <div
          key={book.id}
          className={`${styles.card} ${selected === book.id ? styles.activeCard : ""}`}
          onClick={() => onSelect(book.id)}
        >
          <div className={styles.border} />
          <div className={styles.text}>
            <h2 className={styles.title}>{book.title}</h2>
            <p className={styles.description}>{book.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}