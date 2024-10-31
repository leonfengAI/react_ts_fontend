import { useThemeStore } from '../store/themeStore';

interface UseCase {
  id: string;
  displayName: string;
}

interface FunctionPanelProps {
  selectedOrg: string;
  setSelectedOrg: (org: string) => void;
  selectedUseCase: string;
  setSelectedUseCase: (useCase: string) => void;
}

export function FunctionPanel({ 
  selectedOrg, 
  setSelectedOrg, 
  selectedUseCase, 
  setSelectedUseCase 
}: FunctionPanelProps) {
  const { isDark } = useThemeStore();

  const useCases: UseCase[] = [
    { id: '1', displayName: 'Column Field RAG' },
    { id: '2', displayName: 'UseCase 2' },
    { id: '3', displayName: 'UseCase 3' },
    { id: '4', displayName: 'UseCase 4' },
    { id: '5', displayName: 'UseCase 5' }
  ];

  return (
    <div className={`w-80 flex-shrink-0 ${
      isDark 
        ? 'bg-gradient-to-b from-gray-900 to-gray-800 border-gray-700 text-gray-300' 
        : 'bg-white border-gray-200 text-gray-800'
    } border-r p-6 overflow-y-auto transition-colors duration-300`}>
      <div className="space-y-8">
        <div>
          <label htmlFor="org_select" className={`block text-sm font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-3`}>
            Organization
          </label>
          <select
            id="org_select"
            value={selectedOrg}
            onChange={(e) => setSelectedOrg(e.target.value)}
            className={`w-full border rounded-md py-2 px-4 ${
              isDark 
                ? 'bg-gray-800 text-gray-200 border-gray-600' 
                : 'bg-white text-gray-800 border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200`}
          >
            <option value="MDM">MDM</option>
            <option value="RDS">RDS</option>
          </select>
        </div>

        <div className="space-y-3">
          <label className={`block text-sm font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-3`}>
            Use Cases
          </label>
          {useCases.map((useCase) => (
            <div key={useCase.id} className="flex items-center">
              <input
                type="radio"
                id={`use-case-${useCase.id}`}
                name="use-case"
                value={useCase.id}
                checked={selectedUseCase === useCase.id}
                onChange={(e) => setSelectedUseCase(e.target.value)}
                className={`h-4 w-4 text-purple-500 ${
                  isDark 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-white border-gray-300'
                } focus:ring-purple-500 focus:ring-offset-gray-900`}
              />
              <label
                htmlFor={`use-case-${useCase.id}`}
                className={`ml-3 text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
              >
                {useCase.displayName}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}