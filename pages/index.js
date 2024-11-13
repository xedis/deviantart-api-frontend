import axios from 'axios';

const Home = () => {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    axios.get('/api/gallery?query=SELECT * FROM artworks')
      .then(response => {
        setArtworks(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      {/* Render your component here */}
    </div>
  );
};