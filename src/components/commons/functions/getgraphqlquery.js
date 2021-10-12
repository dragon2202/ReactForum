import { useQuery } from '@apollo/react-hooks'

//Function to grab graphql data from SQL, If an ID is passed
export function GetGraphqlQueryID(param, query) {
    const { data, error, loading } = useQuery(query, {
        variables: {
            id: param
        },
        onError: (({ graphQLErrors, networkError, operation, forward }) => {
            if (graphQLErrors) {
                // Retry the request, returning the new observable
                return forward(operation);
            }

            // To retry on network errors, we recommend the RetryLink
            // instead of the onError link. This just logs the error.
            if (networkError) {
                console.log(`[Network error]: ${networkError}`);
            }
        })
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
    const { data, error, loading } = useQuery(query, {
        onError: (({ graphQLErrors, networkError, operation, forward }) => {
            if (graphQLErrors) {
                // Retry the request, returning the new observable
                return forward(operation);
            }

            // To retry on network errors, we recommend the RetryLink
            // instead of the onError link. This just logs the error.
            if (networkError) {
                console.log(`[Network error]: ${networkError}`);
            }
        })
    })

    if (loading) {
        return 'loading'
    }
    if (error) {
        return 'error'
    }
    return data
}

//https://www.apollographql.com/docs/react/data/error-handling/