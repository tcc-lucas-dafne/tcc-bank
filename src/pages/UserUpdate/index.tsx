import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import UserService from "../../services/account";
import { useAppContext } from "../../context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons"
import { toast } from "react-toastify";

const UserUpdate = () => {
  const [file, setFile] = useState<File | null>(null);
  const { user } = useAppContext()

  const [userData, setUserData] = useState({
    imageUrl: '',
    name: user?.name,
    email: user?.email,
    password: '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [isUserDataValid, setIsUserDataValid] = useState<boolean>(false);
  const [isPasswordDataValid, setIsPasswordDataValid] = useState<boolean>(false);

  useEffect(() => {
    const isUserDataFilled = userData.name && userData.email && userData.password;
    setIsUserDataValid(!!isUserDataFilled);
  }, [userData]);

  useEffect(() => {
    const isPasswordDataFilled = passwordData.currentPassword && passwordData.newPassword && passwordData.confirmNewPassword;
    setIsPasswordDataValid(!!isPasswordDataFilled && (passwordData.newPassword === passwordData.confirmNewPassword));
  }, [passwordData]);

  const handleUserDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handlePasswordDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const handleUserDataSubmit = async (e: any) => {
    e.preventDefault();

    if (userData.imageUrl) {
      try {
        await UserService.uploadUserImage({ url: userData.imageUrl });
      } catch (err) {
        // TODO: Ver se está pegando
        toast.info("Erro ao atualizar dados");
      }
    }
  };

  const handlePasswordDataSubmit = (e: any) => {
    e.preventDefault();
    // TODO: Atualização de senha
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('document', file);

    try {
      await UserService.uploadDocument(formData)
    } catch (error) {
      alert('Error uploading file');
    }
  };

  return (
    <div className="flex justify-between mx-10" style={{ backgroundImage: 'src()' }}>
      <div className="max-w-lg mt-10">
        <form onSubmit={handleUserDataSubmit} className="bg-white shadow-md rounded-lg p-6">
          <h4 className="text-2xl font-bold mb-4">Atualizar Dados de Usuario</h4>
          <div className="flex justify-center mb-4">
            {user?.image ? (
              <img alt="user" className="max-w-52 max-w-40" src={`data:image/png;base64,${user.image}`} />
            ) : (
              <FontAwesomeIcon icon={faUser} className="fa-5x cursor-pointer" />
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2 text-left">URL Imagem:</label>
            <input
              type="url"
              id="image-url"
              name="imageUrl"
              value={userData.imageUrl}
              onChange={handleUserDataChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2 text-left">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={userData.name}
              onChange={handleUserDataChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2 text-left">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleUserDataChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mt-20 mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Insira a senha atual para atualizar os dados
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={userData.password}
              onChange={handleUserDataChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className={`w-full px-4 py-2 bg-blue-500 text-white rounded-md ${!isUserDataValid && 'opacity-50 cursor-not-allowed'}`}
            disabled={!isUserDataValid}
            onClick={handleUserDataSubmit}
          >
            Atualizar
          </button>
        </form>

        <form onSubmit={handlePasswordDataSubmit} className="mt-20 bg-white shadow-md rounded-lg p-6">
          <h4 className="text-2xl font-bold mb-4">Atualização da Senha</h4>
          <div className="mb-4">
            <label htmlFor="currentPassword" className="block text-gray-700 mb-2 text-left">Senha Atual:</label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordDataChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-gray-700 mb-2 text-left">Nova Senha:</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordDataChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmNewPassword" className="block text-gray-700 mb-2 text-left">Confirmação da Nova Senha:</label>
            <input
              type="password"
              id="confirmNewPassword"
              name="confirmNewPassword"
              value={passwordData.confirmNewPassword}
              onChange={handlePasswordDataChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className={`w-full px-4 py-2 bg-blue-500 text-white rounded-md ${!isPasswordDataValid && 'opacity-50 cursor-not-allowed'}`}
            disabled={!isPasswordDataValid}
          >
            Atualizar Senha
          </button>
        </form>
      </div>

      <div className="max-w-lg mt-10">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4">Envio de documento</h1>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  )
};

export default UserUpdate;