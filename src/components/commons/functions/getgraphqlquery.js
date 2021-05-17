import { useQuery } from '@apollo/react-hooks'

//Function to grab graphql data from SQL, used in multiple pages so i made it an export function
export function GetGraphqlQueryID (param, query) {
    const { data, error, loading } = useQuery(query, {
        variables: {
            id: param
        }
    })
    
    if (loading) {
        return 'loading'
    }
    if (error) {
        return 'error'
    }
    return data
}