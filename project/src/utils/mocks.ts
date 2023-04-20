import { address, commerce, datatype, image, internet, lorem, name } from 'faker';
import { City, Location, Offer } from '../types/offer';
import { Comment } from '../types/comment';
import { User } from '../types/user';
import { Notification } from '../types/notification';
import { UserData } from '../types/user-data';

const makeFakeUser = (): User => ({
  avatarUrl: internet.avatar(),
  id: datatype.number(),
  isPro: datatype.boolean(),
  name: name.firstName()
});

const makeFakeLocation = (): Location => ({
  latitude: datatype.float({ min: 52, max: 53, precision: 0.000001 }),
  longitude: datatype.float({ min: 4, max: 5, precision: 0.000001 }),
  zoom: datatype.number({ max: 10 })
});

const makeFakeCity = (): City => ({
  location: makeFakeLocation(),
  name: address.cityName()
});

export const makeFakeOffer = (): Offer => ({
  bedrooms: datatype.number({ max: 10 }),
  city: makeFakeCity(),
  description: commerce.productDescription(),
  goods: [lorem.word()],
  host: makeFakeUser(),
  id: datatype.number(),
  images: [image.imageUrl()],
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  location: makeFakeLocation(),
  maxAdults: datatype.number({ max: 10 }),
  previewImage: image.imageUrl(),
  price: datatype.number({ min: 500, max: 5000 }),
  rating: datatype.float({ min: 1, max: 5, precision: 0.1 }),
  title: commerce.productName(),
  type: commerce.productAdjective()
});

export const makeFakeComment = (): Comment => ({
  comment: lorem.text(),
  date: datatype.datetime().toDateString(),
  id: datatype.number(),
  rating: datatype.float({ min: 1, max: 5, precision: 0.1 }),
  user: makeFakeUser()
});

export const makeFakeNotification = (): Notification => ({
  id: datatype.uuid(),
  type: 'error',
  message: lorem.text(),
  duration: datatype.number({ min: 1000, max: 4000 })
});

export const makeFakeUserData = (): UserData => ({
  id: datatype.number(),
  email: internet.email(),
  token: datatype.uuid(),
  avatarUrl: internet.avatar()
});
