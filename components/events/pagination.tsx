import { Image, StyleSheet, Text, View } from "react-native";
import { PaginationButton } from "./pagination-button";

interface PaginationProps {
  page: number;
  lastPage: number;
  setPage: (page: number) => void;
}

export const Pagination = ({ page, lastPage, setPage }: PaginationProps) => {
  const renderPageNumbers = () => {
    let pages = [];
    const startPage = Math.max(page - 2, 2);
    const endPage = Math.min(page + 2, lastPage - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationButton
          key={i}
          isActive={page === i}
          onPress={() => setPage(i)}
        >
          {i}
        </PaginationButton>,
      );
    }

    return pages;
  };

  const showLeftEllipsis = Math.max(page - 2, 2) > 2;
  const showRightEllipsis = Math.min(page + 2, lastPage - 1) < lastPage - 1;

  return (
    <View style={styles.container}>
      <PaginationButton disabled={page === 1} onPress={() => setPage(page - 1)}>
        <Image
          source={require("../../assets/img/arrow-back.svg")}
          style={styles.icon}
        />
      </PaginationButton>

      <PaginationButton
        isActive={page === 1}
        disabled={page === 1}
        onPress={() => setPage(1)}
      >
        1
      </PaginationButton>

      {showLeftEllipsis && <Text style={styles.ellipsis}>...</Text>}

      {renderPageNumbers()}

      {showRightEllipsis && <Text style={styles.ellipsis}>...</Text>}

      <PaginationButton
        isActive={page === lastPage}
        disabled={page === lastPage}
        onPress={() => setPage(lastPage)}
      >
        {lastPage}
      </PaginationButton>

      <PaginationButton
        disabled={page === lastPage}
        onPress={() => setPage(page + 1)}
      >
        <Image
          source={require("../../assets/img/arrow-next.svg")}
          style={styles.icon}
        />
      </PaginationButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },

  ellipsis: {
    fontSize: 16,
    color: "#444",
  },

  icon: {
    width: 16,
    height: 16,
    resizeMode: "contain",
  },
});
