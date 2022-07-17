import { 
    collection,
    addDoc,
    query,
    where,
    getDocs,
    deleteDoc,
    doc,
    Timestamp,
    orderBy, 
} from 'firebase/firestore'
import { db } from '../config/firebase'
import { toast } from 'react-toastify'

export const addUser = async (user) => {
    const userRef = await addDoc(collection(db, 'users'), user)  
    return userRef
}

export const addMovieFavorite = async (uid, movie, media_type) => {
  try {
    const data = {
      uid,
      movie: {
        id: movie.id,
        title: movie.title || movie.name,
        poster_path: movie.poster_path,
        media_type,
      },
      create_at: Timestamp.fromDate(new Date(Date.now())),
    }

    const res = await addDoc(collection(db, "favoriteMovie"), data);

    return { ...data, id: res.id }
  } catch (error) {
    return toast.error(error.message)
  }
}

export const fetchMovieFavorite = async (uid) => {
  try {
    const q = query(
      collection(db, "favoriteMovie"),
      where("uid", "==", uid),
      orderBy("create_at")
    )
    const querySnapshot = await getDocs(q)
    const favoriteList = []
    querySnapshot.forEach((doc) => {
      favoriteList.push({ ...doc.data(), id: doc.id }) 
    })
    return favoriteList
  } catch (error) {
    return toast.error(error.message)
  }
}

export const deleteFavoriteMovie = async (data) => {
  try {
    await deleteDoc(doc(db, `favoriteMovie/${data.id}`))
    return data
  } catch (error) {
    return toast.error(error.message)
  }
}