const prisma = require('../config/database');

class Project {
  static async findById(id, userId) {
    return await prisma.project.findFirst({
      where: {
        id,
        OR: [
          { ownerId: userId },
          { members: { some: { id: userId } } }
        ]
      }
    });
  }
}

module.exports = Project;