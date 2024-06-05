import ScrollComponent from "./components/ScrollComponent";
import ScrollComponent1 from "./components/ScrollComponents1";

const App = () => {
  return (
    <>
      <div className="ScrollableComponent flex flex-wrap justify-between bg-slate-800 p-4">
        <ScrollComponent
          imgUrl="../public/images/dummy-img1.jpg"
          serviceType="Security Service"
        />
        <ScrollComponent1
          imgUrl="../public/images/url-shortner.webp"
          serviceType="Utility Service"
        />{" "}
        <ScrollComponent1
          imgUrl="../public/images/blogr-landing.jpg"
          serviceType="Blog Forum"
        />
        <ScrollComponent
          imgUrl="../public/images/dummy-img1.jpg"
          serviceType="Security Service"
        />
      </div>
    </>
  );
};

export default App;
