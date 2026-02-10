const prisma = require('../config/database');

class Task {
  static async findById(id) {
    return await prisma.task.findUnique({
      where: { id },
      include: {
        project: {
          include: {
            members: true
          }
        }
      }
    });
  }
}

module.exports = Task;