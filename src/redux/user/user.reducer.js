const INITIAL_STATE = {
  currentUser: null
}

/*
* if state for undefined, state assume o valor passado
* quando o redux é iniciado pela 1ª vez, state é null, por isso precisa de um
* estado inicial
*/

/** 
 * reducer é uma função que recebe 2 objetos
 * 1º state object - estado inicial ou ultimo estado
 * 2º action
 */

/** 
 * action -> objeto que tem um tipo e opcional payload 
 * 
 */

/*
* todos os reducers recebem os action, precisa verificar se o reducer trata da
* action em questao
* por isso, cada action precisa ter um type único em toda a app
*/
const userReducer = (state = INITIAL_STATE, action) => {
  if(action.type === 'SET_CURRENT_USER') {
    return {
      ...state,
      currentUser: action.payload
    }
  } else {
    /**
     * retornar sempre o estado e nao o estado inicial
     * o estado inicial é usado apenas na inicialização do redux
     */
    return state 
  }
}

export default userReducer