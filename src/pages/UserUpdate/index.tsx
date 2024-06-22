import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import UserService from "../../services/account";
import { useAppContext } from "../../context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons"
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { saveAs } from 'file-saver';

const UserUpdate = () => {
  const { user } = useAppContext()
  const navigate = useNavigate();

  const [documentFile, setDocumentFile] = useState<File | null>(null);

  const [isUserDataValid, setIsUserDataValid] = useState<boolean>(false);
  const [isPasswordDataValid, setIsPasswordDataValid] = useState<boolean>(false);
  const [fileContent, setFileContent] = useState('');

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

  const redirectToHome = () => navigate("/");

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

  const handleDocumentSubmit = async (event: any) => {
    event.preventDefault();

    if (!documentFile) return;

    const formData = new FormData();
    formData.append('file', documentFile);

    try {
      await UserService.uploadDocument(formData);
      toast.success("Documento enviado com sucesso!");
    } catch (error) {
      toast.error("Erro ao enviar documento!");
    }
  };

  const handleDocumentFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setDocumentFile(file);
    }
  };

  const handleViewDocument = async () => {
    try {
      if (!user?.account_id) return; 

      const fileName = `user_${user.account_id}_document.pdf`;
      const response = await UserService.getUserDocument(fileName);
      saveAs(response.data, 'document.pdf');
    } catch (error) {
      console.error('Error viewing document:', error);
      toast.error("Nenhum documento encontrado");
    }
  };

  useEffect(() => {
    const isUserDataFilled = userData.name && userData.email && userData.password;
    setIsUserDataValid(!!isUserDataFilled);
  }, [userData]);

  useEffect(() => {
    const isPasswordDataFilled = passwordData.currentPassword && passwordData.newPassword && passwordData.confirmNewPassword;
    setIsPasswordDataValid(!!isPasswordDataFilled && (passwordData.newPassword === passwordData.confirmNewPassword));
  }, [passwordData]);

  return (
    <div className="bg-neutral-50 overflow-y-auto">
      <div className="md:flex justify-start">
        <button className="ml-12 mt-10 w-32 bg-black disabled:bg-black text-white rounded-md py-2 m-2 cursor-pointer" onClick={redirectToHome}>Voltar</button>
      </div>
      <div className="gap-12 md:flex mx-100 justify-center sm:grid grid-cols-2 " style={{ backgroundImage: 'src()' }}>
        <div className="md:w-1/3 mt-10 sm:max-w-lg">
          <form onSubmit={handleUserDataSubmit} className="bg-white shadow-md rounded-lg p-6 m-1.5">
            <h4 className="text-2xl font-bold mb-4">Atualizar Dados de Usuario</h4>
            <div className="flex justify-center mb-4">
              {user?.image ? (
                <img alt="user" className="sm:w-20 md:max-w-52 max-w-40" src={`data:image/png;base64,${user.image}`} />
              ) : (
                <FontAwesomeIcon icon={faUser} className="fa-5x cursor-pointer sm:w-10 h-10 p-3" />
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 mb-2 text-left">URL Imagem:</label>
              <input
                type="url"
                id="image-url"
                name="imageUrl"
                placeholder="Insira um link com a sua incrível imagem!"
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

          <form onSubmit={handlePasswordDataSubmit} className="mt-20 bg-white shadow-md rounded-lg p-6 m-1.5 md:w-100">
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
          <form onSubmit={handleDocumentSubmit} className="md: bg-white shadow-md rounded-lg p-6 sm: m-1.5">
            <h1 className="text-2xl font-bold mb-4">Confirme sua identidade</h1>
            <p className="text-left pb-3">Envie o seu documento de identificação para garantirmos sua identidade.</p>
            <input
              type="file"
              onChange={handleDocumentFileChange}
              className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleViewDocument}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Visualizar Documento
            </button>
            <div className="mt-6">
              {fileContent && (
                <div className="mt-4 bg-gray-100 p-4 rounded-md">
                  <h2 className="text-xl font-bold mb-2">File Content:</h2>
                  <pre className="whitespace-pre-wrap">{fileContent}</pre>
                </div>
              )}
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  )
};

export default UserUpdate;