import React, { useState } from "react";
import {
  Lightbulb,
  Thermometer,
  Lock,
  Power,
  Moon,
  Sun,
  Camera,
} from "lucide-react";

interface Device {
  id: number;
  name: string;
  type: "light" | "thermostat" | "lock" | "switch" | "camera";
  status: boolean;
  pin: string;
}

interface DashboardProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ darkMode, toggleDarkMode }) => {
  const [devices, setDevices] = useState<Device[]>([
    {
      id: 1,
      name: "Living Room Light",
      type: "light",
      status: false,
      pin: "V1",
    },
    {
      id: 2,
      name: "Bedroom Focus",
      type: "thermostat",
      status: false,
      pin: "V2",
    },
    { id: 3, name: "Front Door Lock", type: "lock", status: false, pin: "V3" },
  ]);

  const [selectedCamera, setSelectedCamera] = useState<Device | null>(null);

  const controlDevice = (pin: string, value: number) => {
    const token = "rClOafxW1ekQQUfVW3njIx26zg4g2jww";
    const url = `https://blynk.cloud/external/api/update?token=${token}&pin=${pin}&value=${value}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => console.log("Device controlled:", data))
      .catch((error) => console.error("Error:", error));
  };

  const toggleDevice = (id: number) => {
    setDevices(
      devices.map((device) => {
        if (device.id === id) {
          const newStatus = !device.status;
          controlDevice(device.pin, newStatus ? 0 : 1);
          return { ...device, status: newStatus };
        }
        return device;
      })
    );
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "light":
        return <Lightbulb />;
      case "thermostat":
        return <Thermometer />;
      case "lock":
        return <Lock />;
      case "switch":
        return <Power />;
      case "camera":
        return <Camera />;
      default:
        return null;
    }
  };

  const handleCameraClick = (device: Device) => {
    if (device.type === "camera") {
      setSelectedCamera(selectedCamera?.id === device.id ? null : device);
    }
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Smart Home</h1>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${
              darkMode ? "bg-gray-800" : "bg-gray-200"
            }`}
          >
            {darkMode ? <Sun /> : <Moon />}
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {devices.map((device) => (
            <div
              key={device.id}
              className={`p-6 rounded-lg shadow-md ${
                darkMode ? "bg-gray-800" : "bg-white"
              } ${device.type === "camera" ? "cursor-pointer" : ""}`}
              onClick={() => handleCameraClick(device)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  {getIcon(device.type)}
                  <span className="ml-2 text-xl font-semibold">
                    {device.name}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDevice(device.id);
                  }}
                  className={`px-4 py-2 rounded-full ${
                    device.status
                      ? "bg-green-500 text-white"
                      : darkMode
                      ? "bg-gray-700 text-gray-300"
                      : "bg-gray-300 text-gray-700"
                  }`}
                >
                  {device.status ? "ON" : "OFF"}
                </button>
              </div>
              <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Status: {device.status ? "Active" : "Inactive"}
              </p>
              <p
                className={`text-sm mt-2 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Pin: {device.pin}
              </p>
            </div>
          ))}
        </div>
        {selectedCamera && (
          <div
            className={`mt-8 p-4 rounded-lg ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h2 className="text-2xl font-bold mb-4">
              {selectedCamera.name} Feed
            </h2>
            <div className="aspect-w-16 aspect-h-9 bg-gray-300 rounded-lg overflow-hidden">
              <img
                src="https://source.unsplash.com/random/800x600?security+camera"
                alt="Camera Feed"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
