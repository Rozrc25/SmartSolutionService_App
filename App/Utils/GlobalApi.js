import { request, gql } from 'graphql-request';

const Maste_url = "https://api-ap-south-1.hygraph.com/v2/cluin4cd403ui07uppvenq85w/master";

const getSlider = async () => {
  const query = gql`
    query GetSlider {
        sliders {
          id
          name
          image {
            url
          }
        }
      }
      
    `

  const result = await request(Maste_url, query)
  return result;
}


const getCategories = async () => {
  const query = gql`
    query GetCategory{
        categories{
          id
          name
          icon{
            url
          }
        }
      }
      `

  const result = await request(Maste_url, query)
  return result;
}

const getBusinessList = async () => {
  const query = gql`
    query getBusinessList {
        businessLists {
          id
          name
          email
          contactPerson
          category {
            name
          }
          address
          about
          image {
            url
          }
        }
      }
      
    `
  const result = await request(Maste_url, query)
  return result;

}

const getBusinessListByCategory = async (category) => {
  const query = gql`
  query getBusinessList {
    businessLists(where: {category:{name:"`+ category + `"}}) {
      id
      name
      email
      contactPerson
      category {
        name
      }
      address
      about
      image {
        url
      }
    }
  }
  `
  const result = await request(Maste_url, query)
  return result;

}

const createBooking = async (data) => {
  const mutationQuery = gql`
    mutation createBooking {
      createBooking(
        data: {
          bookingStatus: Booked,
          businessList: { connect: { id: "${data.businessId}" } },
          date: "${data.date}",
          time: "${data.time}",
          userEmail: "${data.userEmail}",
          userName: "${data.userName}"
        }
      ) {
        id
      }
      publishManyBookings { # Add a selection for publishManyBookings
        count
      }
    }
  `;
  const result = await request(Maste_url, mutationQuery);
  return result;
};

const getUserBookings = async (userEmail) => {
  const query = gql`
    query GetUserBookings {
  bookings(orderBy: publishedAt_ASC, where: {userEmail: "`+ userEmail + `"}) {
    time
    userEmail
    userName
    bookingStatus
    date
    id
    businessList {
      id
      image {
        url
      }
      name
      address
      contactPerson
      email
      about
    }
  }
}
 `
  const result = await request(Maste_url, query);
  return result;

}

export default {
  getSlider,
  getCategories,
  getBusinessList,
  getBusinessListByCategory,
  createBooking,
  getUserBookings
}
