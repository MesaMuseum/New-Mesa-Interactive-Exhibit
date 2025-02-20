# RoomPage Component
The RoomPage.jsx file is a React component that renders an interactive 3D room using @react-three/fiber and @react-three/drei. Users can explore the room and interact with books that animate upon clicking, eventually navigating to another page (/places).

# Features
- 3D room Environment: uses three.js and @react-three/fiber to create a panoramic sphere room.
- interactive books: Two books (bookModel) and (bookModel2) that animate when clicked and trigger a page transition
-  Smooth camera transition: The camera moves dynamically during interaction.
- Smooth transitions using React state and CSS classes
- Navigation: clicking a book tranitions the user to the /places route.
