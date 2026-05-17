import styles from "/src/styles/Tags.module.css";

const Tags = ({ tags }) => {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div className={styles.tagContainer}>
      {tags.map((tag, index) => (
        <span key={index} className={styles.tag}>
          {tag}
        </span>
      ))}
    </div>
  );
};

export default Tags;
