
export default function Layout(props: {
  children: React.ReactNode;
  create: React.ReactNode;
}) {
  console.log(JSON.stringify(props.create));
  return (
      <>
        {props.children}
        {props.create}
      </>

  );
}
