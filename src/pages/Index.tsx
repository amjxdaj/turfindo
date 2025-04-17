import { useNavigate } from "react-router-dom";

// Redirect to the user home page
const Index = () => {
  const navigate = useNavigate();
  
  // Redirect to the home page
  navigate("/");
  
  return null;
};

export default Index;
