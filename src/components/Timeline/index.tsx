const Timeline = () => {
    return (
      <ol className="relative border-l border-gray-200 dark:border-gray-700">
          <li className="mb-10 ml-4">
              <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500 text-left">10 de Junho 2024</time>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-left">Recebimento de salário</h3>
              <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400 text-left">Salário recebido de R$1000,00 da empresa XYZ que você trabalha todos os dias</p>
          </li>
          <li className="mb-10 ml-4">
              <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500 text-left">10 de Maio 2024</time>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-left">Recebimento de salário</h3>
              <p className="text-base font-normal text-gray-500 dark:text-gray-400 text-left">R$1000,00</p>
          </li>
          <li className="ml-4">
              <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500 text-left">10 de Abril 2024</time>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-left">Recebimento de salário</h3>
              <p className="text-base font-normal text-gray-500 dark:text-gray-400 text-left">R$1000,00</p>
          </li>
      </ol>
    )
  };
  
  export default Timeline;
  