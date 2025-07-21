// export function useAuth() {
//
// }

// export function useAuth() {
//     const { fetch, clear, loggedIn, user } = useUserSession()
//
//     const getCode = async ( body: object ) => {
//         const { data } = await useApi('/login', {
//             body: body
//         }, 'login', 'POST');
//
//         return data;
//     }
//
//     const login = async ( body: object ) => {
//         const {data} = await useApi('/check-verification', {
//           body: body
//         }, 'login/check-verification', 'POST');
//
//         await setUserSession( {}, {
//             user: {
//                 name: 'John Doe'
//             }
//         } )
//         return data;
//     }
//
//     return {
//         getCode,
//         login,
//         loggedIn,
//         user
//     };
//
//     // async function login(credentials: { email: string; password: string }) {
//     //     const response = await $fetch('/api/auth/login', {
//     //         method: 'POST',
//     //         body: credentials
//     //     })
//     //     await fetch()
//     //     return response
//     // }
//     //
//     // // async function register(data: { email: string; password: string; name: string }) {
//     // //     return await $fetch('/api/auth/register', {
//     // //         method: 'POST',
//     // //         body: data
//     // //     })
//     // // }
//     // //
//     // // async function logout() {
//     // //     await $fetch('/api/auth/logout', { method: 'POST' })
//     // //     await clear()
//     // // }
//     //
//     // return { login, loggedIn, user }
//}