"use client";

import { linkWpPost } from "@/app/api/linkWpPost";
import { Button } from "../ui/button";
import { useAction } from "next-safe-action/hooks";
import { Loader2 } from "lucide-react";

export default function LinkWithApp({ postId }: { postId: number }) {
	const action = useAction(linkWpPost);

	return (
		<Button
			disabled={action.isPending}
			onClick={(event) => {
				event.stopPropagation();
				action.execute({ postId });
			}}
		>
			{action.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
			Click here to link
		</Button>
	);
}
