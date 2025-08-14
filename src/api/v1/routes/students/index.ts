import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { prisma } from "../../../../lib/prisma";
import {
	createStudentSchema,
	studentDeleteSchema,
	studentUpdateSchema,
} from "./schemas";

//Create Hono Route
const studentRoutes = new Hono();

//POST method for Student
studentRoutes.post("/", zValidator("json", createStudentSchema), async (c) => {
	const body = c.req.valid("json");

	const student = await prisma.student.create({
		data: body,
	});
	return c.json(student, 201);
});

//Getting All Student Data
studentRoutes.get("/", async (c) => {
	const students = await prisma.student.findMany(
		{orderBy:{
			id:"asc"
		}}
	);
	return c.json(students, 200);
});

//Updating Student Data by ID
studentRoutes.put(
	"/:id",
	zValidator("json", studentUpdateSchema),
	async (c) => {
		const { id } = c.req.param();
		const body = c.req.valid("json");
		const student = await prisma.student.update({
			where: { id },
			data: body,
		});
		return c.json(student, 200);
	},
);

//Deleting a Student Data by ID
studentRoutes.delete(
	"/:id",
	zValidator("param", studentDeleteSchema),
	async (c) => {
		const { id } = c.req.param();
		await prisma.student.delete({
			where: { id },
		});
		return c.json(
			{ message: `Student with id ${id} deleted successfully` },
			200,
		);
	},
);

//Getting Single Data of Student
studentRoutes.get("/:id", async (c) => {
	const { id } = c.req.param();
	const student = await prisma.student.findUnique({
		where: { id },
	});
	if (!student) {
		return c.json({ error: "Student not found" }, 404);
	}
	return c.json(student);
});

export default studentRoutes;
