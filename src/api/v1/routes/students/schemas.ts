import { z } from "zod";

//Student Schema
export const createStudentSchema = z.object({
	name: z.string().min(2,{
		message:"Name must be at least 2 characters long."
	}).max(50),
	rollNumber: z.string().min(3).max(16),
	email: z.email(),
	dateOfBirth: z.coerce.date(),
	age: z.number().int().positive().min(5).max(120),
	gender: z.string().min(1).max(10),
	address: z.string().min(1).max(200),
	phoneNumber: z.string().min(10).max(15),
});

export type createStudentInput = z.infer<typeof createStudentSchema>;

//Response Schema
export const studentResponseSchema = z.object({
	id: z.cuid2(),
	name: z.string().min(2).max(50),
	rollNumber: z.string().min(3).max(16),
	email: z.email(),
	dateOfBirth: z.coerce.date(),
	age: z.number().int().positive().min(5).max(120),
	gender: z.string().min(1).max(10),
	address: z.string().min(5).max(200),
	phoneNumber: z.string().min(10).max(15),
	createdAt: z.iso.date(),
	updatedAt: z.iso.date(),
});

export type studentResponse = z.infer<typeof studentResponseSchema>;

//Update Schema
export const studentUpdateSchema = 
	createStudentSchema.partial();

export type studentUpdateInput = z.infer<typeof studentUpdateSchema>;

//Access Single Student Detail Schema
export const studentSingleResponseSchema = z.object({
	id: z.cuid2().transform((val) => parseInt(val, 10)),
});

export type studentSingleResponse = z.infer<typeof studentSingleResponseSchema>;

//Student Delete by ID Schema
export const studentDeleteSchema = z.object({
	id: z.cuid2(),
});

export type studentDeleteInput = z.infer<typeof studentDeleteSchema>;
