import { allPosts, userProfiles } from "./mock-data"

/**
 * Validates that a story belongs to a specific user
 */
export function validateStoryOwnership(storyId: number, userId: number): boolean {
  const story = allPosts.find((post) => post.id === storyId)
  if (!story) {
    console.error(`[v0] Story validation failed: Story ${storyId} not found`)
    return false
  }

  if (story.userId !== userId) {
    console.error(`[v0] Story validation failed: Story ${storyId} belongs to user ${story.userId}, not user ${userId}`)
    return false
  }

  return true
}

/**
 * Gets all stories for a specific user with validation
 */
export function getUserStories(userId: number) {
  const user = userProfiles.find((u) => u.id === userId)
  if (!user) {
    console.error(`[v0] User validation failed: User ${userId} not found`)
    return []
  }

  const userStories = allPosts.filter((post) => post.userId === userId)
  console.log(`[v0] Found ${userStories.length} stories for user ${userId} (${user.name})`)

  return userStories
}

/**
 * Validates that a story exists and returns it with ownership info
 */
export function getStoryWithOwnership(storyId: number) {
  const story = allPosts.find((post) => post.id === storyId)
  if (!story) {
    console.error(`[v0] Story not found: ${storyId}`)
    return null
  }

  const owner = userProfiles.find((u) => u.id === story.userId)
  if (!owner) {
    console.error(`[v0] Story ${storyId} has invalid userId: ${story.userId}`)
    return null
  }

  return {
    story,
    owner,
    isValid: true,
  }
}

/**
 * Batch validates all stories in the system
 * Returns a report of any issues found
 */
export function batchValidateStories() {
  const report = {
    totalStories: allPosts.length,
    validStories: 0,
    invalidStories: 0,
    orphanedStories: [] as number[],
    userStoryCounts: new Map<number, number>(),
    issues: [] as string[],
  }

  // Validate each story
  allPosts.forEach((post) => {
    const owner = userProfiles.find((u) => u.id === post.userId)

    if (!owner) {
      report.invalidStories++
      report.orphanedStories.push(post.id)
      report.issues.push(`Story ${post.id} ("${post.title}") has invalid userId: ${post.userId}`)
    } else {
      report.validStories++
      const currentCount = report.userStoryCounts.get(post.userId) || 0
      report.userStoryCounts.set(post.userId, currentCount + 1)
    }
  })

  // Check for users with no stories
  userProfiles.forEach((user) => {
    const storyCount = report.userStoryCounts.get(user.id) || 0
    if (storyCount === 0) {
      report.issues.push(`User ${user.id} (${user.name}) has no stories`)
    }
  })

  return report
}

/**
 * Prevents cross-assignment by validating story creation/update
 */
export function validateStoryAssignment(storyData: { userId: number; title: string }) {
  const user = userProfiles.find((u) => u.id === storyData.userId)

  if (!user) {
    console.error(`[v0] Cannot assign story to invalid user ${storyData.userId}`)
    return {
      valid: false,
      error: `User ${storyData.userId} does not exist`,
    }
  }

  console.log(`[v0] Story "${storyData.title}" validated for user ${user.id} (${user.name})`)
  return {
    valid: true,
    user,
  }
}

/**
 * Checks if current user is the owner of a story
 */
export function isStoryOwner(storyId: number, currentUserId: number): boolean {
  const story = allPosts.find((post) => post.id === storyId)
  if (!story) {
    return false
  }

  return story.userId === currentUserId
}

/**
 * Gets validation summary for debugging
 */
export function getValidationSummary() {
  const report = batchValidateStories()

  console.log("=== Story Validation Summary ===")
  console.log(`Total Stories: ${report.totalStories}`)
  console.log(`Valid Stories: ${report.validStories}`)
  console.log(`Invalid Stories: ${report.invalidStories}`)
  console.log(`Orphaned Stories: ${report.orphanedStories.join(", ") || "None"}`)
  console.log("\nStories per User:")
  report.userStoryCounts.forEach((count, userId) => {
    const user = userProfiles.find((u) => u.id === userId)
    console.log(`  User ${userId} (${user?.name}): ${count} stories`)
  })

  if (report.issues.length > 0) {
    console.log("\nIssues Found:")
    report.issues.forEach((issue) => console.log(`  - ${issue}`))
  } else {
    console.log("\n✓ No issues found!")
  }

  return report
}
