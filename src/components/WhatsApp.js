import { WhatsAppOutlined } from "@ant-design/icons"; // Import the WhatsApp icon

const WhatsApp = () => {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <a
        href="https://wa.me/8801898841011?text=Hello%20I%20am%20interested%20in%20your%20services"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 ease-in-out flex items-center justify-center"
        style={{ width: "50px", height: "50px" }}>
        <WhatsAppOutlined className="text-2xl" />
      </a>
    </div>
  );
};

export default WhatsApp;
