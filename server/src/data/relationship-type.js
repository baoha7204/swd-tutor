const RelationshipType = {
  // Hierarchical relationships
  PARENT_OF: "parent_of", // Concept is a parent of another concept
  CHILD_OF: "child_of", // Concept is a child of another concept
  PREREQUISITE_FOR: "prerequisite_for", // Concept must be learned before another
  BUILDS_UPON: "builds_upon", // Concept extends or builds on another concept

  // Compositional relationships
  COMPONENT_OF: "component_of", // Concept is a part of another concept
  CONTAINS: "contains", // Concept contains other concepts

  // Associative relationships
  RELATED_TO: "related_to", // General relationship between concepts
  SIMILAR_TO: "similar_to", // Concepts have significant similarities
  CONTRASTS_WITH: "contrasts_with", // Concepts have notable differences
  ANALOGY_OF: "analogy_of", // Concepts have analogous relationships

  // Application relationships
  APPLIES_TO: "applies_to", // Concept applies to a specific context
  EXAMPLE_OF: "example_of", // Concept is an example of another concept
  CASE_STUDY_OF: "case_study_of", // Detailed example applying the concept

  // Formula-specific relationships
  DEFINES: "defines", // Formula defines a concept
  DERIVES_FROM: "derives_from", // Formula is derived from another formula
  VARIANT_OF: "variant_of", // Formula is a variation of another formula
  SPECIAL_CASE_OF: "special_case_of", // Formula is a special case of another formula
  SOLUTION_FOR: "solution_for", // Formula provides a solution for a concept

  // Cognitive relationships
  CONCRETIZES: "concretizes", // Makes an abstract concept concrete
  ABSTRACTS: "abstracts", // Generalizes a concrete concept
  FORMALIZES: "formalizes", // Provides formal definition of an intuitive concept

  // Usage relationships
  COMMONLY_USED_WITH: "commonly_used_with", // Concepts often used together
  CAN_REPLACE: "can_replace", // Concept can functionally replace another
  CAN_REPRESENT: "can_represent", // Concept can be used to represent another};
};
/**
 * Sample usage in concept relationships table:
 *
 * Linear Equation → Slope: RelationshipType.RELATED_TO
 * Equation → Linear Equation: RelationshipType.PARENT_OF
 * Variable → Expression: RelationshipType.COMPONENT_OF
 * Quadratic Formula → Quadratic Equation: RelationshipType.SOLUTION_FOR
 * Point-Slope Form → Slope-Intercept Form: RelationshipType.VARIANT_OF
 */

export default RelationshipType;
