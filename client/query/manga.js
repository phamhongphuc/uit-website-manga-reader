import gql from 'graphql-tag';

export const getMangas = gql`
    query getMangas {
        mangas {
            id
            name
            description
            status
            genres {
                name
            }
            image {
                url
            }
            chapters {
                id
                name
            }
        }
    }
`;

export const getManga = gql`
    query getManga($id: Int!) {
        manga(id: $id) {
            id
            name
            description
            associatedNames
            publishedFrom
            publishedTo
            status
            type
            authors
            genres {
                name
            }
            image {
                url
            }
            chapters {
                id
                name
            }
        }
    }
`;
