import {
	createStudentRoute,
	getStudentByIdRoute,
	getStudentRoute,
} from "./api/v1/routes/students/openapi.definitions";

export const openApiDocument = {
	openapi: "3.1.0",
	info: {
		title: "Student Management API",
		version: "1.0.0",
	},
	paths: {
		"/api/v1/students": {
			post: {
				...createStudentRoute,
			},
			get: {
				...getStudentRoute,
			},
		},
		"/api/v1/students/{id}": {
			get: {
				...getStudentByIdRoute,
			},
		},
	},
};
