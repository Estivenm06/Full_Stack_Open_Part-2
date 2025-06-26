import "./index.css";
import { Header } from "./Header";
import { Content } from "./Content";
import { Total } from "./Total";

const Courses = ({ courses }) => {
  return (
    <>
      <h1>Web development curriculum</h1>
      {courses.map(({ name, parts, id }) => (
        <article key={id}>
          <Header header={name} />
          <Content parts={parts} />
          <Total exercises={parts} />
        </article>
      ))}
    </>
  );
};

export { Courses };
