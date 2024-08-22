"use client";

import type { WpPostWithPost } from "@/app/api/getWpPosts";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@radix-ui/react-hover-card";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { Check, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { TableCell, TableRow } from "../ui/table";
import LinkWithApp from "./LinkWithApp";

export default function PostRow({ wpPost }: { wpPost: WpPostWithPost }) {
	const router = useRouter();

	return (
		<TableRow
			className="cursor-pointer"
			onClick={
				wpPost.post?.id
					? () => router.push(`/posts/${wpPost.post?.id}`)
					: undefined
			}
		>
			<TableCell>
				{wpPost.post?.id ? (
					<Tooltip>
						<TooltipTrigger asChild>
							<Check className="text-green-500" />
						</TooltipTrigger>
						<TooltipContent>Linked with app</TooltipContent>
					</Tooltip>
				) : (
					<HoverCard>
						<HoverCardTrigger asChild>
							<X className="text-red-500" />
						</HoverCardTrigger>
						<HoverCardContent>
							<p>Not linked with app</p>
							<LinkWithApp postId={wpPost.id} />
						</HoverCardContent>
					</HoverCard>
				)}
			</TableCell>
			<TableCell className="font-medium">{wpPost.title.rendered}</TableCell>
			<TableCell>{wpPost.status}</TableCell>
			<TableCell>{wpPost.link}</TableCell>
		</TableRow>
	);
}
