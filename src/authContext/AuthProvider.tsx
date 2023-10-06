// import { useReducer } from 'react';
// import { AuthContextProps } from '../types/componentPropTypes';

// import { AuthContextType } from '../types/authTypes';

// export const authReducer = (state: any, action: any) => {
//   switch (action.type) {
//     case 'UPDATE_USER_TOKEN':
//       return { ...state, userToken: action.payload };
//     default:
//       return state;
//   }
// };

// export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
//   const [state, dispatch] = useReducer(authReducer, {
//     userToken: null,
//   });
//   console.log('STATE---', state);
//   return (
//     <AuthContext.Provider value={{ ...state, dispatch }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
export const whatever = () => {};
