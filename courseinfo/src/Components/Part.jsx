const Part = ({ name, exercises }) => {
  console.log(name, exercises);
  return (
      <li>
        {name}: {exercises}
      </li>
  );
};

export { Part };
