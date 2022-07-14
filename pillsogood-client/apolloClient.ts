import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import AsyncStorage from '@react-native-async-storage/async-storage'
let client: ApolloClient<object>

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
})

client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})
export default client
