import ViewScript from './components/ViewScript';
const page = ({ params }: { params: { slug: string } }) => {
  return (
    <div>
      <ViewScript params={params} />
    </div>
  );
};

export default page;
