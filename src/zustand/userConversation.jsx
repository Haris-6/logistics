import { create } from 'zustand'; //A function from the Zustand library used to create a store for managing state.

const useConversation = create((set) => ({  //A custom hook created using Zustand to manage conversation-related state
    selectedConversation:null,  //initail state of conversation is empty
    setSelectedConversation:(selected) => set({selectedConversation:selected}), //update conversation
    messages:[],   //intial state of messages
    setMessages: (messages) => set({messages}) //update message
}))


export default useConversation