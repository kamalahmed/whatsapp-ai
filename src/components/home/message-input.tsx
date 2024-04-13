import { Laugh, Mic, Plus, Send } from "lucide-react";
import { Input } from "../ui/input";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useConversationStore } from "@/store/chat-store";
import toast from "react-hot-toast";
import useComponentVisible from "@/hooks/useComponentsVisible";
import EmojiPicker, {Theme} from "emoji-picker-react";

const MessageInput = () => {
	const [msgText, setMsgText] = useState("");
	const sendTextMessage = useMutation(api.messages.sendTextMessage);
	const { selectedConversation } = useConversationStore();
	const me = useQuery(api.users.getMe);
	const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(false);

	const handleTextMessage = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			await sendTextMessage({content: msgText, conversation: selectedConversation!._id, sender: me!._id }); // Here ! means telling ts it will always be available.
			setMsgText("");
		} catch (error:any) {
			toast(error.message);
		}

	}

	return (
		<div className='bg-gray-primary p-2 flex gap-4 items-center'>
			<div className='relative flex gap-2 ml-2'>
				{/* EMOJI PICKER Starts */}
				<div ref={ref} onClick={()=> setIsComponentVisible(true)}>
					{isComponentVisible && (
						<EmojiPicker 
						theme={Theme.DARK}
						style={{position: 'absolute', bottom: '1.5rem', left:'1rem', zIndex:50}}
						onEmojiClick={
							(emojiObj, e) => {
                                setMsgText(prev => prev + emojiObj.emoji);
                            }
						}
						
						/>
					)}
					<Laugh className='text-gray-600 dark:text-gray-400' />
					
				</div> 
				{/*End Emoji Picker */}

				<Plus className='text-gray-600 dark:text-gray-400' />
			</div>
			<form className='w-full flex gap-3' onSubmit={handleTextMessage}>
				<div className='flex-1'>
					<Input
						type='text'
						placeholder='Type a message'
						className='py-2 text-sm w-full rounded-lg shadow-sm bg-gray-tertiary focus-visible:ring-transparent'
						value={msgText}
						onChange={(e) => setMsgText(e.target.value)}
					/>
				</div>
				<div className='mr-4 flex items-center gap-3'>
					{msgText.length > 0 ? (
						<Button
							type='submit'
							size={"sm"}
							className='bg-transparent text-foreground hover:bg-transparent'
						>
							<Send />
						</Button>
					) : (
						<Button
							type='submit'
							size={"sm"}
							className='bg-transparent text-foreground hover:bg-transparent'
						>
							<Mic />
						</Button>
					)}
				</div>
			</form>
		</div>
	);
};
export default MessageInput;