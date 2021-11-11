import { useQuery } from '@apollo/react-hooks'

//Function to grab graphql data from SQL, If an ID is passed
export function GetGraphqlQueryID(param, query) {
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
//Function to grab graphql data from SQL, If an ID is NOT passed
export function GetGraphqlQuery(query) {
    const { data, error, loading } = useQuery(query)

    if (loading) {
        return 'loading'
    }
    if (error) {
        return 'error'
    }
    return data
}

export function GetGraphqlQueryID_Refetch(param, query) {
    const { data, error, loading, refetch } = useQuery(query, {
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
    return [data, refetch]
}

export function GetGraphqlQuery_Refetch(query) {
    const { data, error, loading, refetch } = useQuery(query)

    if (loading) {
        return 'loading'
    }
    if (error) {
        return 'error'
    }
    return [data, refetch]
}

//https://www.apollographql.com/docs/react/data/error-handling/